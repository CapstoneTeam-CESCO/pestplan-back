import { Controller, Get, Param, Query } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DeviceDetailsDto } from 'src/models/dto/deviceDetails.dto';
import { DeviceListDto } from 'src/models/dto/deviceList.dto';

@Controller('devices')
export class DevicesController {
    constructor(private readonly devicesService: DevicesService) {}

    @Get()
    getDeviceList(
        @Query('access_token') accessToken: string,
        @Query('page') page: number,
        @Query('row') row: number,
        @Query('regions') regions: string[],
        @Query('locations') locations: string[],
        @Query('models') models: string[]
    ): Promise<DeviceListDto[]> {
        return this.devicesService.getDeviceList(accessToken, regions, locations, models, page, row);
    }

    @Get('/details/:id')
    getDeviceDetails(@Param('id') deviceId: string, @Query('page') page: number, @Query('row') row: number): Promise<DeviceDetailsDto> {
        return this.devicesService.getDeviceDetails(deviceId, page, row);
    }
}
