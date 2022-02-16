export enum LoadingStatus {
	idle = 'idle',
	pending = 'pending',
	success = 'success',
	failed = 'failed',
}

export class RequestState<DataType, MetaType> {
	data: DataType;
	meta?: MetaType;
	loadingStatus: LoadingStatus;
}
