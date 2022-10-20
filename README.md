
# Website quản lí cho thuê xe ô tô

Một SPA với Rest API viết bằng Laravel quản lý cho thuê xe ô tô




## Tech Stack

**Client:** Reactjs *v18.2.0* , Redux *v4.2.0* , TailwindCSS *v3.1.0*

**Server:** PHP 8.0.2, Laravel 9 

## Điều kiện
* Cài đặt **PHP 8** và các gói đi kèm để chạy **Laravel 9**
* Cài đặt **MySQL** mới nhất,  
## Cài đặt

#### Download project

```bash
  git clone https://github.com/chinhnt2211/thue_xe_oto.git
```

#### Thiết lập môi trường
- Tạo 1 file `.env` trong thư mục `/thue_xe_oto` dựa trên `.env.example` có sẵn 

- Tương tự tạo 1 file `.env` trong thư mục `/thue_xe_oto/react` dựa trên `.env.example` có sẵn 

#### Chạy chương trình

- Chạy Laravel 
```bash
  php artisan serve 
```

- Chạy Reactjs
```bash
  npm build && npm preview
```