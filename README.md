# Danışmanlık Uygulaması
---
## Tr
**Uygulama Amacı:** İlk defa full-stack olarak geliştirdiğim mini bir proje yapmak istedim. Bu projeyle birlikte yeni front-end, back-end denemelerimi bu proje üzerinden yapacağım.
**Danışmanlık Uygulaması Nedir:** Kullanıcılar bu siteye üye oluyorlar ve uzman kişilere bilmedikleri konuları danışıyorlar ve danıştıktan sonra bu kişiler hakkında yorum yazıyorlar. Bu şekilde bin bilsen de bir bilene danış atasözünü yerine getirmiş oluyoruz. :D

---

## Uygulama Özellikleri
1. Üye olmadan tüm kullanıcıları ve kullanıcılara gelen yorumları görüntüleme fakat üye olmadan yorum yapma özelliğinin kapalı olması.
2. Üye olan kullanıcıların aynı zamanda danışman olması ve diğer danışmanlara yorum yapabilmesi ve aynı zamanda üyeliklerini sildirme işlemleri.
3. Adminin tüm yorumları ve kullanıcıları silebilmesi.
4. Kullanıcıların otoritesine göre yetki işlemleri.(Adminin ve Kullanıcıların yetkileri)
5. Kullanıcı izni olmayan linklere girememesi(Kullanıcı Güncelleme)
6. Uygulamanın mobil ekranlara uyumlu bir arayüzde çalışması.

## Kullanılan Teknolojiler ve Araçlar
---
Uygulama ***front-end*** ve ***back-end*** olmak üzere iki kısımdan oluşuyor ve MVC mimarisine uygun bir şekilde tasarlanmıştır.
- Front-end: ReactJs
- Back-end: NodeJs, ExpressJs
- Veritabanı: MongoDB
- Kimlik Doğrulama, Güvenlik: PassportJs, Json Web Token
- Component Kütüphanesi: MUI Component, antd Component
- Back-end ile Haberleşme: Axios, Rest Api, React-Query
- Form Yönetimi: Formik 
- Sayfa Yönlendirme: React Router Dom
- Validasyon İşlemleri: YupJs
- Versiyonlama: Git
----
### Uygulamayı Çalıştırmadan Önce
1. İlk başta back-end daha sonra front-end dizinine gidip `npm install` komudunun çalıştırılması.
2. MongoDB' nin kurulması
3. back-end dizininde .env dosyası oluşturulup örnek olarak aşağıdaki gibi bir yapının kurulması.
`
JWT_SECRET=random
DB_URI=mongodb://localhost/backend
`
4. front-end dizinide .env dosyası oluşturulup örnek olarak aşağıdaki gibi bir yapının kurulması.
`
REACT_APP_BASE_ENDPOINT=http://localhost:3000/api
`
## Api Metodları
---
- **Kayıt Ol:** Post "/api/register" name, email, password alanları doldurulmalı
- **Giriş Yap:** Post "/api/login" email, password alanları doldurulmalı
- **Kullanıcıları Getirme:** Get /api/users?page=1 page alanına göre 12 şer kullanıcı getiriliyor.
- **Kullanıcı Detay:** Get /api/users/:userid Kullanıcıların bilgileri ve kendisine yapılan yorumlar getiriliyor.
- **Kullanıcı Silme:** Del /api/users/:userid kullanıcı hesabını silebiliyor veya admin diğer kullanıcıları silebiliyor. Bearer token gerekli.
- **Yorum Silme:** Del /api/users/:userid/comments/:commentid kullanıcı yaptığı yorumları silebiliyor. Bearer token gerekli.
- **Kullanıcı bilgilerini değiştirme:** Put /api/users/:userid kullanıcı bilgilerini değiştirebiliyor. Bearer token gerekli.
- **Yapılam yorum güncelleme:** Put /api/users/:userid/comments/:commentid. Kullanıcının yaptığı yorumu güncellemesi. Bearer token gerekli
- **Yorum yapma:** Post /api/users/:userid/comments. Kullanıcı başka kullanıcılara yorum yapıyor. Bearer token gerekli.
- **Ben kimim:** Get /api/whoami token'a karşılık gelen kullanıcı bilgileri (Client tarafında componentleri manipüle etmek için önemli). Bearer token gerekli.

### Uygulama Ekran Görüntüleri:
1. **Anasayfa**

![photos](/Photos/anasayfa.png)
2. **Kullanıcı Detay Sayfası**

![photos](/Photos/userDetail.png)

3. **Kayıt Sayfası**

![photos](/Photos/signInPage.png)

4. **Giriş Sayfası**

![photos](/Photos/loginPage.png)

5. **Giriş Yapmadan Önce Navbar**

![photos](/Photos/beforeLoginPage.png)

6. **Giriş Yaptıktan Sonra Navbar**

![photos](/Photos/afterLoginNavbar.png)

7. **Kullanıcı Bilgilerini Güncelleme ve Silme Sayfası**

![photos](/Photos/ProfileInformationPage.png)

8. **Yorum Yapma Sayfası**

![photos](/Photos/commentPage.png)
## Güncellemeler:
- Ana sayfaya infiniteQuery özelliği eklendi ✔️
![photos](/Photos/infiniteQuery.png)

### Client Tarafında ve back-end tarafında engellediklerim
- Kullanıcı her iki tarafta da kendisine yorum yapamıyor client tarafında yorum yapma inputu kapalı.
- Çıkış yaptıktan sonra localStorage'da token siliniyor ve information page sayfası korumalı sayfa oluyor girilmeye çalışınca sign in sayfasına yönlendiriliyor.
- Giriş yapılmadığı zaman kullanıcı yorum yapma özelliği her iki tarafta da devre dışı kalıyor.

### Yapmadıklarım ve ileriki zamanda ekleyeceğim özellikler:
- Admin'e özel sayfa eklenecek. Admin kendi işlemlerini o sayfa üzerinden gerçekleştirecek.
- Kullanıcılar yorumlarını değiştirebilsin diye kullanıcı detay sayfasına yeni özellikler eklenecek.
- Görünümde iyileştirmeler yapılacak (React Memoization).
- Test yazılacak. 
- Ana sayfaya sonsuz sorgu özelliği eklenecek ✔️