const path = require("path");

module.exports = {
  //productionはバンドしたコード内の改行やインデント、余分な半角スペースなどを取り除いてバンドル.
  //developmentは改行やインデントはそのままに、バンドルします.
  mode: "development",
  //entry：どのファイルを起点にバンドルするかを設定するプロパティ.
  entry: "./src/index.tsx",
  //output：どのディレクトリにバンドルしたファイルを出力するかを設定するプロパティ.
  output: {
    path: path.join(__dirname, "dist"), //distディレクトリmain.jsというファイル名でバンドルしたファイルに出力.
    filename: "main.js", //出力先のパスはoutput.pathに、出力するファイル名はoutput.filenameに値を渡す.
  },
  //module：babel-loaderやcss-loaderといった Loader の設定を行うプロパティ.
  module: {
    //module.rules：この配列の中にTypeScript や CSS の Loader を設定するオブジェクトを渡す.
    rules: [
      {
        //TypeScriptのLoader
        test: /\.(ts|tsx)$/, //正規表現でターゲットとなる拡張子を書く.どのファイルを処理の対象とするかの設定.
        use: [
          //使用する Loader を書く. 配列になっていて、その中に Loader を文字列もしくはオブジェクトで渡す.
          {
            //※Loader は実行順にルールがあり、 配列の後ろから処理が行われる. 順番に気をつけながら設定する.
            loader: "babel-loader",
            options: { presets: ["@babel/preset-env", "@babel/react"] },
          },
          {
            loader: "ts-loader",
            options: {
              configFile: path.resolve(__dirname, "tsconfig.json"),
            },
          },
        ],
      },
      {
        //cssのLoader
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
          },
        ],
      },
    ],
  },
  //devServer：webpack-dev-serverの設定を行うプロパティ
  //※webpack-dev-server：webpack で開発サーバーを立ち上げることができるライブラリ. コードを更新すると自動的にビルドしてブラウザのビューが更新される.
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"), //サーバーの起点となるディレクトリ. パスはoutput.pathと同様.
    },
    port: 3000, //ポート番号を指定でき、指定したポートでサーバーが立ち上がる.
  },
  //resolve：インポート時にのパスの問題(絶対パスや相対パス)を解決するプロパティ.
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"], //拡張子を文字列として配列に渡すことで、インポートのパスに書く拡張子を省略できる.
  },
  //target：サーバー側(Node.js)とブラウザ側(フロント)どちらにコンパイルするかを設定するプロパティ.
  //サーバー側：node、ブラウザ側：web
  target: "web",
  performance: {
    hints: false,
  },
};
