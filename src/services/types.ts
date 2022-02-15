import { ServiceNames } from '../constants/app.constants';
import type { ApiService } from './Api.service';

export type Services = {
	[ServiceNames.api]?: ApiService;
};



