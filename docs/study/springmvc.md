# **Spring MVC**

## **@RequestBody转换为JSON的秘密**

当我们想把控制器的@RequestBody中的参数转换为JSON,执行完控制器返回后，处理器会启用结果解析器来处理解析这个结果，轮训注册给Spring MVC的HttpMessageConverter接口的实现类，因为MappingJackson2HttpMessageConverter这个实现类以及被MVC注册了，再加上Spring MVC将控制器的结果类型表明为JSON，所以就匹配上了，就通过处理器内部把结果转换为了JSON。

## 操作HttpSession对象。

> 我们在MVC中定义了@SessionAttribute,@SessionAttributes注解
> 
- @SessionAttribute 该参数应用于参数，作用是将HttpSession中的属性读出，赋予控制器的参数 就是把Session的属性读出，
- @SessionAttributes 该注解只能用于类上，我们会将相关数据模型的属性保存到Session中

在此，我们可以将名为name1,name2的数据存入Session中，也包含Long数据类型的数据
``` 
@SessionAttributes(names={"name1","name2"},types=Long.Class)
@RequestMapping("/session")
@Controller
public Class UserController{
    @GetMapping("/test")
    public String test(@SessionAttribute("id") Long id,Model mv){
        mv.addAttribute("name1","8");        
        mv.addAttribute("name2","8");
        mv.addAttribute("new_id",id);
        return "";
    }
}
``` 

## **给控制器增加通知**

我们可以在MVC中给控制器增加通知，增强功能，于是在控制器方法的前后和异常发生的时候去执行不同的处理，四个注解

- @ControllerAdvice

定义一个控制器的通知类，允许定义一些关于增强控制器的各类通知和限定增强哪些控制器功能，我自己的理解：就是说这个是一个拦截器，拦截后，后自定义增强

- @InitBinder

定义控制器参数绑定规则，如转换规则、格式化等，它会在参数转换之前执行。

- ExceptionHandler

定义控制器发生异常后的操作。一般来说，发生异常后，可以跳转到指定的友好页面。

- ModelAttribute

可以在控制器方法执行之前，对数据模型进行操作。

``` 
    @ControllerAdvice(
    //指定拦截包
    basePackages={"com.springboot.controller.*"}
    //限定被标注为@Controller的类才会被拦截
    annotaions = Controller.class
)
public class myControllerAdvice{

    @InitBinder
    public void iniDataBinder(WebDataBinder binder){
        //WebDataBinder 是自动生成的参数，定义了Data类型的参数

        //自定义日期编辑器，限定格式+参数不允许为空
        CustomDateEditor dateEditor = 
        new CustomDateEditor(new SimpleDateFormat("yyyy-MM-dd"),false);

        //注册自定义日期编辑器
        binder.registerCustomEditor(Date.class,dateEditor);
    }

    @ModelAttribute
    public void projectModel(Model model){
        model.addAttribute("project_name","chapter");
    }
    //表示拦截所有异常
    @ExceptionHandler(value= Exception.class)
    public String exception(Model model,Exception e){
        //当出现异常时，会直接执行的逻辑
        model.addAttribute("exception",e.getMessage());
        return "exception";
    }
}
``` 

## 获取请求头参数
当我们需要获取请求头参数的时候，可以使用@RequestHeader进行获取。

    @PostMapping("/header")
    //在此通过@RequestHeader来获取请求头里的参数
    public User headerUser(@RequestHeader("id") Long id){
        User user  = useService.getUser(id);
        return user;
    }
