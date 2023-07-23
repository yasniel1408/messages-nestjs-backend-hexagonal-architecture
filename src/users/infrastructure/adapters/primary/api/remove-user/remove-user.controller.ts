import { Controller, Delete, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { UserResponseDto } from './dto/user.response.dto';
import { IRemoveUserController } from '@users/infrastructure/ports/primary/api/remove-user.controller.interface';
import { RemoveUserService } from '@users/usecases/remove-user/remove-user.service';

@Controller('users')
export class RemoveUserController implements IRemoveUserController<string, UserResponseDto> {
  constructor(private removeUserService: RemoveUserService) {}

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string): Promise<UserResponseDto> {
    return await this.removeUserService.remove(parseInt(id));
  }
}