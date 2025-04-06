# Laravelプロジェクトの作成方法
1. cloneする。
    プロジェクトのコピーを自分のコンピュータにダウンロードします。

    ```
    git clone git@github.com:sakanadaketabetetai/laravel-react-inertia.git
    ```

2. docker composeで立ち上げる。
    ダウンロードしたプロジェクトを使って、必要なプログラム（コンテナと呼ばれる）を自動的に起動します。
    ```
    cd php83-nginx-mariadb
    ```
    ```
    docker-compose up -d
    ```

3. phpコンテナに入る
    起動したプログラムの中の一つ、PHPを使う部分にアクセスします。

    ```
    docker exec -it myapp-php bash
    ```
    ```
    docker-compose exec web bash
    ```

4. laravelをインストール
    PHPを使って、Laravelというツールをセットアップ（インストール）します。

    ```
    composer install
    ```

5. phpコンテナから出る
    Laravelのセットアップが終わったら、PHPの部分を終了します。

    ```
    exit
    ```
6. docker-compose.ymlを編集する
設定ファイル（docker-compose.yml）を変更して、プロジェクトの設定を更新します。以下のようにvolumesセクションを編集してください。

    web: 
        volumes:
        - - .:/var/www/
        + - ./my-app:/var/www/

    nginx: 
        volumes:
        - - .:/var/www/
        + - ./my-app:/var/www/
 
再度docker composeで立ち上げる
更新した設定で、もう一度プログラムを起動します。

```
docker-compose up -d
```

7. myapp-phpコンテナに入り、.envファイルを作成
```
docker exec -it myapp-php bash
```
又は
```
docker-compose exec web bash
```
そのあと.env.exampleをコピーして、.envファイルを作成
```
cp .env.example .env
```

8. .envファイルを修正
タイムゾーン及び言語設定
```
APP_TIMEZONE=Asia/Tokyo
APP_LOCALE=ja
APP_FALLBACK_LOCALE=ja
APP_FAKER_LOCALE=ja_JP

```
データベースの設定
```
DB_CONNECTION=mysql
DB_HOST=myapp-mariadb
DB_PORT=3306
DB_DATABASE=development
DB_USERNAME=mysql
DB_PASSWORD=mysql
```

9. laravel-breezeをインストール
```
composer require laravel/breeze
```

10. reactをインストール
```
php artisan breeze:install react --typescript
```

11. reactプラグインをインストール
```
npm install --save-dev @vitejs/plugin-react
```
