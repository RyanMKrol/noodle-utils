# noodle-utils *2.1.0*



### src/errors/DataNotFound.js


#### new DataNotFound() 

Used when an item isn't found in Dynamo on read






##### Returns


- `Void`



#### DataNotFound.constructor(params) 

Constructor for error




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| params | `any`  | Any params that need to be passed to parent | &nbsp; |




##### Returns


- `Void`




### src/errors/InvalidQueueReadItem.js


#### new InvalidQueueReadItem() 

Used when an item is passed to the DynamoReadQueue that doesn't contain the corret props






##### Returns


- `Void`



#### InvalidQueueReadItem.constructor(params) 

Constructor for error




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| params | `any`  | Any params that need to be passed to parent | &nbsp; |




##### Returns


- `Void`




### src/errors/SizeExceeded.js


#### new SizeExceeded() 

Used when the size of a write item to dynamo is too big






##### Returns


- `Void`



#### SizeExceeded.constructor(params) 

Constructor of error




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| params | `any`  | Any params to be passed to the Error parent | &nbsp; |




##### Returns


- `Void`




### src/methods/isUndefined.js


#### isUndefined(value) 

Helper method to determine if a value is undefined or not




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| value | `any`  | The value to check | &nbsp; |




##### Returns


- `boolean`  Whether the value is undefined or not




### src/methods/pipeline.js


#### pipeline(fns) 

Method to handle sequential tasks that rely on the output of the previous task




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| fns | `Array.<Function>`  | The functions you would like to run over the input | &nbsp; |




##### Returns


- `any`  The result of the pipeline processing



#### pipelineClosureMethod(func, args) 

This method allows you to pass more arguments through the pipeline via a closure




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| func | `Function`  | The method you want to run in the pipeline | &nbsp; |
| args | `any`  | The closure args you want to use in the method | &nbsp; |




##### Returns


- `Function`  A method to be called with a new argumnet as well  as those captured in the closure




### src/methods/sleep.js


#### sleep(time) 

Method to handle sequential tasks that rely on the output of the previous task




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| time | `number`  | The time, in ms, to sleep for | &nbsp; |




##### Returns


-  Nothing




### src/classes/dynamo/DynamoReadBatch.js


#### new DynamoReadBatch() 

Creates a new Queue for pushing data to Dynamo.






##### Returns


- `Void`



#### DynamoReadBatch.constructor(dynamoCredentials, dynamoRegion, tableName) 

Constructor for DynamoReadBatch




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| dynamoCredentials | `module:dynamo.DynamoCredentials`  | The credentials for a Dynamo table | &nbsp; |
| dynamoRegion | `string`  | The region of the Dynamo table we're using | &nbsp; |
| tableName | `string`  | The name of the table we want to store data in | &nbsp; |




##### Returns


- `Void`




### src/classes/dynamo/DynamoWriteQueue.js


#### new DynamoWriteQueue() 

Creates a new Queue for pushing data to Dynamo.






##### Returns


- `Void`



#### DynamoWriteQueue.constructor(dynamoCredentials, dynamoRegion, tableName) 

Constructor for DynamoWriteQueue




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| dynamoCredentials | `module:dynamo.DynamoCredentials`  | The credentials for a Dynamo table | &nbsp; |
| dynamoRegion | `string`  | The region of the Dynamo table we're using | &nbsp; |
| tableName | `string`  | The name of the table we want to store data in | &nbsp; |




##### Returns


- `Void`



#### DynamoWriteQueue.push(item, callback) 

Method to push items to our queue




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| item | `object`  | Any item that we want to push to Dynamo | &nbsp; |
| callback | `Function`  | A method to call once the item has been stored | &nbsp; |




##### Returns


-  Nothing



#### DynamoWriteQueue.pushBatch(batch, callback) 

Method to push items to our queue




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| batch | `Array.<object>`  | A batch of items to push into the queue | &nbsp; |
| callback | `Function`  | A method to call once the item has been stored | &nbsp; |




##### Returns


-  Nothing




### src/classes/dynamo/DynamoReadQueue.js


#### new DynamoReadQueue() 

Creates a new Queue for pushing data to Dynamo.






##### Returns


- `Void`



#### DynamoReadQueue.constructor(dynamoCredentials, dynamoRegion, tableName) 

Constructor for DynamoReadQueue




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| dynamoCredentials | `module:dynamo.DynamoCredentials`  | The credentials for a Dynamo table | &nbsp; |
| dynamoRegion | `string`  | The region of the Dynamo table we're using | &nbsp; |
| tableName | `string`  | The name of the table we want to store data in | &nbsp; |




##### Returns


- `Void`



#### DynamoReadQueue.push(item, callback) 

Pushes item to be read into the queue




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| item | `ReadItem`  | An item to be read from Dynamo | &nbsp; |
| callback | `Function`  | The method to be called once the item has been read | &nbsp; |




##### Returns


- `Void`



#### DynamoReadQueue.pushBatch(batch, callback) 

Method to push items to our queue




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| batch | `Array.<ReadItem>`  | A batch of items to push into the queue | &nbsp; |
| callback | `Function`  | A method to be called for each read item | &nbsp; |




##### Returns


-  Nothing



#### validateItem(item) 

Validates that an item pushed to the queue is valid




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| item | `ReadItem`  | Specifies what to read from the database | &nbsp; |




##### Returns


- `Void`



#### validateCallback(callback) 

Validates that the callback fulfils the requirements for a read




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| callback | `Function`  | The method to validate | &nbsp; |




##### Returns


- `Void`




*Documentation generated with [doxdox](https://github.com/neogeek/doxdox).*
