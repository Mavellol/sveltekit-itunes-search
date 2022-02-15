import { writable } from 'svelte/store';
import { LoadingStatus, RequestState } from '../types/common';
import type { Writable } from 'svelte/types/runtime/store';
import type { Updater } from 'svelte/types/runtime/store';
import type { Subscriber, Unsubscriber } from 'svelte/types/runtime/store';
import type { Services } from '../services/types';

export const createInitialRequestState = <T>(initialState: T): RequestState<T> => {
	return { data: initialState, loadingStatus: LoadingStatus.idle };
};

export interface RequestStore<DataType, PayloadType> {
	subscribe: (run: Subscriber<RequestState<DataType>>, invalidate?: (value?: RequestState<DataType>) => void) => Unsubscriber;
	request: RequestHandler<DataType, PayloadType>;
	reset: () => void;
}

export type RequestHandler<DataType, PayloadType> = (
	services: Services,
	payload: PayloadType,
	update: (updater: Updater<RequestState<DataType>>) => void,
	set: (value: RequestState<DataType>) => void,
) => Promise<void>;

export const createRequestStore = <DataType, PayloadType>(
	services: Services,
	initialState: DataType,
	handler: RequestHandler<DataType, PayloadType>,
): RequestStore<DataType, PayloadType> => {
	const {subscribe, update, set}: Writable<RequestState<DataType>> = writable(createInitialRequestState(initialState));

	const request = async (payload) => {
		await handler(services, payload, update, set);
	}

	const reset = () => {
		set(createInitialRequestState(initialState))
	}

	return {
		subscribe,
		request,
		reset,
	};
}