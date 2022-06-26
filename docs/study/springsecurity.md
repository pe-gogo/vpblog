# Spring Security

引入依赖
```
    <dependency>￼   
         <groupId>org.springframework.boot</groupId>￼    
         <artifactId>spring-boot-starter-security</artifactId>￼
    </dependency>
```
## 概述和简单安全认证
Java Web工程中是基于Servlet过滤器（Filter）对请求进行拦截，然后在Filter中通过自己的验证逻辑
来决定是否放行请求，Spring Security的原理也是基于这个原理，在进入到DispatcherServlet前就可以对SpringMVC的请求进行拦截，然后通过一定的验证，从而决定是否放行请求访问系统。
- 我们可以通过@EnableWebSecurity来驱动Spring Sercurity
- DelegatingFilterProxy类作为开发者配置类
## 原理
在我们启用Spring Security后，IOC容器就会为我们创建一个名为springSecurityFilterChain的Spring Bean，它的类型是（拦截逻辑）FilterChainProxy,实现了Filter接口，它是一个特殊的拦截器，之后在Spring Security操作过程中它会提供Servlet过滤器DelegatingFilterProxy,这个过滤器会通过Spring Web IoC容器去获取Spring Security 所创建的FilterChainProxy的对象。
## 使用Spring Security
### 使用@EnableWebSecurity
当配置类上加入该注解后，我们请求url的时候就会自动弹出spring security的登录界面，用户名为user，密码为日志上的密码，必须保证你的日志等级为
INFO或者以下，才能看到密码,登录成功后即可进入界面。
### 可用配置项
```
spring.security.user.name = myuser
spring.security.user.password =123456

#用户角色
spring.security.user.roles =
# OAuth提供者详细配置信息￼
spring.security.oauth2.client.provider.*= #￼
# OAuth客户端登记信息￼
spring.security.oauth2.client.registration.*= 
# 安全过滤器责任链拦截的分发类型￼
spring.security.filter.dispatcher-types=async,error,request ￼
# Spring Security过滤器排序￼
spring.security.filter.order=-100￼
```
### 自定义初始化FilterChainProxy
在Spring Security中，过滤器DelegatingFilterPRoxy的拦截逻辑是靠FilterChainProxy来完成的，我们需要自定义它的初始化的话可以使用
Spring Security的SecurityConfigurer接口，通过它即可对Spring Security配置

#### 密码加密
在Spring Security中，有多种加密算法，官方推荐使用 BCryptPasswordEncoder，BCryptPasswordEncoder 使用 BCrypt 强哈希函数，开发者在使用时可以选择提供 strength 和 SecureRandom 实例。strength 越大，密钥的迭代次数越多，密钥迭代次数为 2^strength。strength 取值在 4~31 之间，默认为 10。

- BCryptPasswordEncoder 就是 PasswordEncoder 接口的实现类。
PasswordEncoder 这个接口中就定义了三个方法：
```
publicinterface PasswordEncoder {
	String encode(CharSequence rawPassword);
	boolean matches(CharSequence rawPassword, String encodedPassword);
	default boolean upgradeEncoding(String encodedPassword) {
		returnfalse;
	}
}
```

- encode 方法用来对明文密码进行加密，返回加密之后的密文。
- matches 方法是一个密码校对方法，在用户登录的时候，将用户传来的明文密码和数据库中保存的密文密码作为参数，传入到这个方法中去，根据返回的  Boolean 值判断用户密码是否输入正确。
- upgradeEncoding 是否还要进行再次加密

