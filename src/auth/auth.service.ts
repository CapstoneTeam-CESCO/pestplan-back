import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserModelDto } from 'src/models/dto/userModel.dto';
import { AccessTokenDto } from './dto/accessToken.dto';
import { TokenPayloadDto } from './dto/tokenPayload.dto';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    /**
     * createToken - 토큰을 생성한다.
     */
    createToken(userData: UserModelDto): AccessTokenDto {
        const { id, username } = userData;
        const payload = {
            sub: id,
            username,
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    /**
     * decodeToken - 올바른 토큰인지 검증하고 payload를 리턴한다.
     */
    decodeToken(token: string): TokenPayloadDto {
        try {
            return this.jwtService.verify(token);
        } catch(exception) {
            throw new HttpException({
                status: HttpStatus.UNAUTHORIZED,
                error: "The token has expired",
            }, HttpStatus.UNAUTHORIZED);
        }
    }
}
