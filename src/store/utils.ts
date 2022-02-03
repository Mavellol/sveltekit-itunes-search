import type { RequestState } from '../types/common';
import { LoadingStatus } from '../types/common';

export const createInitialRequestState = <T>(initialState: T): RequestState<T> => {
	return {data: initialState, loadingStatus: LoadingStatus.idle}
}