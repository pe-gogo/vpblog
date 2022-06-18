# REST风格

## REST风格解释
REST按其英文名称（Representational State Transfer）可翻译为表现层状态转换。 首先需要有资源才能表现，所以第一个名称是“资源”。有了资源也要根据需要以合适的形式表现资源，这就是第二个名词——“表现层”。 最后是资源可以背CRUD等，也就是第三个名次——“状态转换”。

资源： 它可以是系统权限用户、角色和菜单等，总之就是一个具体存在的对象，可以用URL来指向它，每个资源对应一个特定的URL。要获取这个资源，访问它的URL即可，而在REST中每一个资源都会对应一个独一无二的URL，在REST风格中，URI也可以称为端点。

表现层： 有了资源还需要确定如何表现这个资源。 例如：一个用户可以使用JSON、XML或其他形式表现出来，犹如可能返回的是一幅图片。

状态转换： 资源可以经历的过程CRUD

## HTTP的动作
Get: 访问服务器资源

POST: 提交服务器资源信息，用来创建新的资源

PUT: 修改服务器已经存在的资源，使用PUT时需要把所有资源一并提交

PATCH: 修改服务器已经存在的资源，使用PATCH时只需把部分资源提交

DELETE: 删除资源

HEAD: 获取资源的元数据（Content-type)

OPTIONS: 提供资源可供客户端修改的信息

## 处理HTTP状态码、异常与响应头
ResponseStatus: 返回追定的响应码给客户端的实体类
```
@ResponseEntity: 封装错误信息和状态码
@PostMapping(value="/user")
public ResponseEntity<User> insertUserEntity(){
    //逻辑
    
    //在逻辑中写了header请求头对象，result返回对象结果，还有Http状态码，封装到ResponseEntity里返回去。
    return new ResponseEntity<User>(result,headers,HttpStatus.CREATED);
}


//方法执行成功后，返回该状态码
@ResponseStatus(HttpStatus.CREATED)
@PostMapping("/user")
public User insertUser(args){
    //逻辑
}
```
