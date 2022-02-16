import { writable } from 'svelte/store';
import { LoadingStatus, RequestState } from '../types/common';
import type { Writable } from 'svelte/types/runtime/store';
import type { Updater } from 'svelte/types/runtime/store';
import type { Subscriber, Unsubscriber } from 'svelte/types/runtime/store';
import type { Services } from '../services/types';

export const createInitialRequestState = <DataType, MetaType>(initialState: DataType, meta?: MetaType): RequestState<DataType, MetaType> => {
	return { data: initialState, loadingStatus: LoadingStatus.idle, meta: meta };
};

export interface RequestStore<DataType, PayloadType, MetaType = undefined> {
	subscribe: (
		run: Subscriber<RequestState<DataType, MetaType>>,
		invalidate?: (value?: RequestState<DataType, MetaType>) => void
	) => Unsubscriber;
	request: (v: PayloadType) => void;
	reset: () => void;
}

export type RequestHandler<DataType, PayloadType, MetaType = undefined> = (
	services: Services,
	payload: PayloadType,
	update: (updater: Updater<RequestState<DataType, MetaType>>) => void,
	set: (value: RequestState<DataType, MetaType>) => void,
) => Promise<void>;

const handlerWrapper = async (handler: RequestHandler<any, any, any>, services, payload, update, set) => {
	update(s => ({...s, loadingStatus: LoadingStatus.pending}))
	await handler(services, payload, update, set);
	update(s => ({...s, loadingStatus: LoadingStatus.success}))
}

export const createRequestStore = <DataType, PayloadType, MetaType = undefined>(
	services: Services,
	initialState: DataType,
	handler: RequestHandler<DataType, PayloadType, MetaType>,
	meta: MetaType,
): RequestStore<DataType, PayloadType, MetaType> => {
	const {subscribe, update, set}: Writable<RequestState<DataType, MetaType>> =
		writable(createInitialRequestState(initialState, meta));

	const request = async (payload) => {
		await handlerWrapper(handler, services, payload, update, set);
	}

	const reset = () => {
		set(createInitialRequestState(initialState, meta))
	}

	return {
		subscribe,
		request,
		reset,
	};
}