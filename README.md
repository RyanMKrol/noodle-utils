# noodle-utils *2.0.2*



### src/classes/DynamoReadBatch.js


#### new DynamoReadBatch() 

Creates a new Queue for pushing data to Dynamo.






##### Returns


- `Void`



#### DynamoReadBatch.constructor(dynamoCredentials, dynamoRegion, tableName) 

Constructor for DynamoWriteQueue




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| dynamoCredentials | `DynamoCredentials`  | The credentials for your Dynamo table | &nbsp; |
| dynamoRegion | `string`  | The region of the Dynamo table we're using | &nbsp; |
| tableName | `string`  | The name of the table we want to store data in | &nbsp; |




##### Returns


- `Void`




### src/classes/DynamoWriteQueue.js


#### new DynamoWriteQueue() 

Creates a new Queue for pushing data to Dynamo.






##### Returns


- `Void`



#### DynamoWriteQueue.constructor(dynamoCredentials, dynamoRegion, tableName) 

Constructor for DynamoWriteQueue




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| dynamoCredentials | `DynamoCredentials`  | The credentials for your Dynamo table | &nbsp; |
| dynamoRegion | `string`  | The region of the Dynamo table we're using | &nbsp; |
| tableName | `string`  | The name of the table we want to store data in | &nbsp; |




##### Returns


- `Void`



#### DynamoWriteQueue.push(item) 

Method to push items to our queue




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| item | `object`  | Any item that we want to push to Dynamo | &nbsp; |




##### Returns


-  Nothing



#### DynamoWriteQueue.pushBatch(batch) 

Method to push items to our queue




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| batch | `Array.<object>`  | A batch of items to push into the queue | &nbsp; |




##### Returns


-  Nothing




### src/methods/isUndefined.js


#### isUndefined(value) 

Helper method to determine if a value is undefined or not




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| value | `any`  | The value to check | &nbsp; |




##### Returns


- `boolean`  Whether the value is undefined or not




### src/methods/sleep.js


#### sleep(time) 

Method to handle sequential tasks that rely on the output of the previous task




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| time | `number`  | The time, in ms, to sleep for | &nbsp; |




##### Returns


-  Nothing




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




*Documentation generated with [doxdox](https://github.com/neogeek/doxdox).*
