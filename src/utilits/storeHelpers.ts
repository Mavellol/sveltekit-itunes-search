import type { RequestHandler } from './requestHelpers';

interface PrepareStore<DataType, PayloadType, MetaType = undefined> {
	initialState: DataType
	handler: RequestHandler<DataType, PayloadType, MetaType>
	meta: MetaType
}

export const getPrepareStore = <DataType, PayloadType, MetaType = undefined>(
	initialState: DataType,
	handler: RequestHandler<DataType, PayloadType, MetaType>,
	meta: MetaType,
): PrepareStore<DataType, PayloadType, MetaType> => ({
	initialState,
	handler,
	meta
})