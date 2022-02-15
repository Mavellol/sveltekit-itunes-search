import { ApiService } from './services/Api.service';
import type { Services } from './services/types';
import { ServiceNames } from './constants/app.constants';
import { initStore } from './store';

export interface Container {
	store: any;
	services: Services;
}

export const createContainer = (): Container => {
	const apiService = new ApiService();

	const services: Services = {
		[ServiceNames.api]: apiService,
	};

	const store = initStore(services);

	return {
		store,
		services,
	};
};