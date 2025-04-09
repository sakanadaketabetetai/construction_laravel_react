# 工事管理アプリケーション(Laravel + React + Inertia学習用)

## 概要
このプロジェクは工事管理と設備管理、業務日誌の機能を持つアプリケーションです。
ユーザーは会員登録後、工事情報の管理及び設備情報の管理、業務日誌作成回覧をすることができます。

## 作成した目的
現在、エクセル及び紙で管理されている工事情報や設備の点検記録や部品リストを一つのアプリケーションとして管理することで業務効率化を図りたい。
また、現在サービス期限が切れた業務日誌の機能を含めることで、より工事管理ができる。

## 機能一覧
### 工事管理
- 工事情報一覧機能（検索機能や工事実績出力機能付き）
- 工事情報新規作成機能
- 月間工程表作成機能
- 工事報告書作成機能

### 設備管理
- 設備情報一覧機能（検索機能）
- 設備情報編集機能（追加、情報編集）
- 設備点検記録一覧（検索機能）及び作成機能
- 部品一覧機能（検索機能）及び情報編集、CSV出力機能

### 業務日誌
- 業務日誌作成、回覧機能（回覧状態確認可能）
- 工事完了操作

### 回覧ルート設定機能
- 業務日誌の回覧ルート柵瀬機能

### 点検テンプレート作成
- 各設備の試運転データ記録用のテンプレート作成機能
　圧力(Mpa)、流量(t/h)、電流値(A)、振動値(μm)等

## 使用技術（実行環境）
- Docker 26.1.4
- Laravel 11.x
- php:8.3-fpm
- mariadb
- node 11.2.0
- react 18.2.0

## 環境構築
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
