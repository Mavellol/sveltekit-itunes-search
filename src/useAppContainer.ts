import { ApiService } from './services/Api.service';
import type { Services } from './services/types';
import { ServiceNames } from './constants/app.constants';
import type { Store } from './store';
import { initStore } from './store';

export interface Container {
	store: Store;
	services: Services;
}

export const createContainer = (): Container => {
	const apiService = new ApiService();

	const services: Services = {
		[ServiceNames.api]: apiService,
	};

	return {
		store: initStore(services),
		services,
	};
};