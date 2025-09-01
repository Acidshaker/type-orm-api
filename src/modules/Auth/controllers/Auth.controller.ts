import { Request, Response } from "express";
import { AuthService } from "../services/Auth.service";
import { validate } from "class-validator";
import { RegisterDto } from "../dto/register.dto";
import { LoginDto } from "../dto/login.dto";
import { CreateAdminDto } from "../dto/createAdmin.dto";

export class AuthController {
  constructor(private authService: AuthService = new AuthService()) {}

  async register(req: Request, res: Response) {
    const dto = Object.assign(new RegisterDto(), req.body);
    const errors = await validate(dto);
    if (errors.length > 0) return res.status(400).json({ errors });

    try {
      const result = await this.authService.register(dto);
      res.status(201).json(result);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  async login(req: Request, res: Response) {
    const dto = Object.assign(new LoginDto(), req.body);
    const errors = await validate(dto);
    if (errors.length > 0) return res.status(400).json({ errors });

    try {
      const result = await this.authService.login(dto);
      res.json(result);
    } catch (err: any) {
      res.status(401).json({ message: err.message });
    }
  }

  async refresh(req: Request, res: Response) {
    const { refreshToken } = req.body;
    try {
      const result = await this.authService.refresh(refreshToken);
      res.json(result);
    } catch (err: any) {
      res.status(403).json({ message: err.message });
    }
  }

  async logout(req: Request, res: Response) {
    const { refreshToken } = req.body;
    try {
      const result = await this.authService.logout(refreshToken);
      res.json(result);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  async createAdmin(req: Request, res: Response) {
    const dto = Object.assign(new CreateAdminDto(), req.body);
    const errors = await validate(dto);
    if (errors.length > 0) return res.status(400).json({ errors });

    try {
      const result = await this.authService.createAdmin(dto);
      res.status(201).json(result);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }
}
