# Laravelプロジェクトの作成方法
1. cloneする。
    プロジェクトのコピーを自分のコンピュータにダウンロードします。

    ```git clone git@github.com:sakanadaketabetetai/laravel-react-inertia.git ```

2. docker composeで立ち上げる。
    ダウンロードしたプロジェクトを使って、必要なプログラム（コンテナと呼ばれる）を自動的に起動します。
    ```cd php83-nginx-mariadb```
    ```docker-compose up -d```

3. phpコンテナに入る
    起動したプログラムの中の一つ、PHPを使う部分にアクセスします。

    ```docker exec -it myapp-php bash```
    ```docker-compose exec web bash```

4. laravelをインストール
    PHPを使って、Laravelというツールをセットアップ（インストール）します。

    ```composer create-project --prefer-dist laravel/laravel my-app```

5. phpコンテナから出る
    Laravelのセットアップが終わったら、PHPの部分を終了します。

    ```exit```
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

```docker-compose up -d```
