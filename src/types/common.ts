import type { Unsubscriber } from 'svelte/types/runtime/store';

export enum LoadingStatus {
	idle = 'idle',
	pending = 'pending',
	success = 'success',
	failed = 'failed',
}

export class RequestState<T> {
	data: T;
	loadingStatus: LoadingStatus;
}
