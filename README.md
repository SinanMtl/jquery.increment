# jQuery Increment

Bu eklenti ile kolay bir şekilde increment input hazırlayabilirsiniz.

Öncelikle script dosyamızı HTML dosyamıza eklememiz gerek

```
<script type="text/javascript" src="jquery.inputstilci.js"></script>
```

Daha sonra aşağıdaki gibi bir input hazırlıyoruz:

```  
<input type="text" value="12" data-min="00" data-max="23" />
```
Buradaki `data` etiketleri ile minimum ve maksimum değer aralığımızı ayarlıyoruz.

Javascript :
```
<script type="text/javascript">
	$(".increment-input").increment();	
</script>
```

Input'a çift basamaklı yazdırmak için `{double : true}` şeklinde ayarlamak yeterli olur.