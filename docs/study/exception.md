# 处理异常
## 处理404异常
### 自定义查找失败异常
```
import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@Data
//自定义异常，继承了runtime的异常
public class NotFoundException extends RuntimeException{

    private static final long serialVersionUID = 1L;
    //异常自定义信息
    private String customMsg;
    //异常编码
    private Long code;

    public NotFoundException(Long code,String customMsg){
        super();
        this.code=code;
        this.customMsg=customMsg;
    }
}
```


### 定义控制器通知来处理异常
当我们抛出NotFoundException异常后，会进行处理
```
@ControllerAdvice(
        //在此定义了拦截的包和类
        basePackages = {"com.lqy.springboot.controller.*"},
        annotations = {Controller.class, RestController.class}
)
public class ControllerExceptionHandler {
    //异常处理,因为我们的异常继承了Runtime异常，所以放在这里拦截
    @ExceptionHandler(value = NotFoundException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ResponseBody
    public Map<String,Object> exception(HttpServletRequest req,
                                        NotFoundException e){

        HashMap<String, Object> map = new HashMap<>();
        map.put("code",e.getCode());
        map.put("message",e.getCustomMsg());
        return map;
    }

}
```
