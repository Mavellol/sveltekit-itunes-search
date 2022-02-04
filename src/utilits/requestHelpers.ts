import { writable } from 'svelte/store';
import { LoadingStatus, RequestState } from '../types/common';
import type { Writable } from 'svelte/types/runtime/store';
import type { Updater } from 'svelte/types/runtime/store';

export const createInitialRequestState = <T>(initialState: T): RequestState<T> => {
	return { data: initialState, loadingStatus: LoadingStatus.idle };
};

export type ExecutingRequest<T, P> = (
	payload: P,
	update: (updater: Updater<RequestState<T>>) => void,
	set: (value: RequestState<T>) => void,
) => Promise<void>;

export const createRequestStore = <T, P>(
	initialState: T,
	executingRequest: ExecutingRequest<T, P>
) => {
	const {subscribe, update, set}: Writable<RequestState<T>> = writable(createInitialRequestState(initialState));

	const request = async (payload) => {
		await executingRequest(payload, update, set);
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