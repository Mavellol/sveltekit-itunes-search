import type { RequestHandler } from './requestHelpers';

interface PrepareStore<DataType, PayloadType> {
	initialState: DataType
	handler: RequestHandler<DataType, PayloadType>
}

export const getPrepareStore = <DataType, PayloadType>(
	initialState: DataType,
	handler: RequestHandler<DataType, PayloadType>
): PrepareStore<DataType, PayloadType> => ({
	initialState,
	handler,
})