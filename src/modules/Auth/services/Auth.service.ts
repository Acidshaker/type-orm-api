import { AppDataSource } from "@core/config/database"; 
import { generateAccessToken, generateRefreshToken, verifyToken } from "@shared/utils/jwt";
import { User } from "../models/User.entity"; 
import { RefreshToken } from "../models/RefreshToken.entity";
import { RegisterDto } from "../dto/register.dto";
import { LoginDto } from "../dto/login.dto";
import { CreateAdminDto } from "../dto/createAdmin.dto";
import bcrypt from "bcrypt";


export class AuthService {
  private userRepo = AppDataSource.getRepository(User);
  private refreshTokenRepo = AppDataSource.getRepository(RefreshToken);

  async register(dto: RegisterDto) {
    const existing = await this.userRepo.findOne({ where: { email: dto.email } });
    if (existing) throw new Error("Email ya registrado");

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = this.userRepo.create({ email: dto.email, password: hashedPassword, role: "user" });
    await this.userRepo.save(user);

    const accessToken = generateAccessToken({ sub: user.id, role: user.role });
    const refreshToken = generateRefreshToken({ sub: user.id, role: user.role });

    const rtEntity = this.refreshTokenRepo.create({ token: refreshToken, user });
    await this.refreshTokenRepo.save(rtEntity);

    return {message: "Usuario creado correctamente", accessToken, refreshToken };
  }

  async login(dto: LoginDto) {
    const user = await this.userRepo.findOne({ where: { email: dto.email } });
    if (!user) throw new Error("Credenciales inválidas");

    const isValid = await bcrypt.compare(dto.password, user.password);
    if (!isValid) throw new Error("Credenciales inválidas");

    await this.refreshTokenRepo.delete({ user: { id: user.id } });

    const accessToken = generateAccessToken({ sub: user.id, role: user.role });
    const refreshToken = generateRefreshToken({ sub: user.id, role: user.role });

    const rtEntity = this.refreshTokenRepo.create({ token: refreshToken, user });
    await this.refreshTokenRepo.save(rtEntity);

    return { accessToken, refreshToken };
}
  async refresh(refreshToken: string) {
    if (!refreshToken) throw new Error("Refresh token requerido");

    const stored = await this.refreshTokenRepo.findOne({
      where: { token: refreshToken },
      relations: ["user"],
    });
    if (!stored) throw new Error("Refresh token inválido");

    try {
      const decoded = verifyToken(refreshToken) as any;
      const newAccessToken = generateAccessToken({ sub: decoded.sub, role: decoded.role });
      return { accessToken: newAccessToken };
    } catch {
      throw new Error("Refresh token expirado o inválido");
    }
  }

  async logout(refreshToken: string) {
    await this.refreshTokenRepo.delete({ token: refreshToken });
    return { message: "Logout exitoso" };
  }

  // Crear admin → solo accesible por endpoint protegido
  async createAdmin(dto: CreateAdminDto) {
    const existing = await this.userRepo.findOne({ where: { email: dto.email } });
    if (existing) throw new Error("Email ya registrado");

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = this.userRepo.create({ email: dto.email, password: hashedPassword, role: "admin" });
    await this.userRepo.save(user);

    return { message: "Admin creado exitosamente" };
  }
}
