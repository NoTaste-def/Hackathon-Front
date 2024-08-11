# LikeLion-Hackathon Front-End Product

### [Figma](https://www.figma.com/proto/Am6ehAp9Y3ZuqV7m3hA7zD/24_%EC%A0%80%EC%86%8D%EB%85%B8%ED%99%94_%EB%8A%90%EB%A6%BC%EC%9D%98%EB%AF%B8%ED%95%99?t=jEe87ggp40lpQifW-1&node-id=1-2&starting-point-node-id=1%3A2)

> #### History

###### 2024-07-31 : Steps.js, StepSelection.js completion

###### 2024-08-01 : TodoBtn.js, SelectionConfirmModal.js, PlusBtn.js, EmptyBtn.js and CheckBtn.js were completed.

###### 2024-08-02 : Struggle to fix CORS error



### 問題
CORSエラーによる特定URLへの接近が不可能になった。
<br/>

### 挑戦１
AJAX要請を送る際にheaderへCSRFトークンを載せることにした。

載せる際に色んな方法を使ってみた。
１．CSRFトークンをサーバー側からAPI要請でもらい、それを載せる。
２．Cookieの中からCSRFトークンを取り出して載せる。

１，２番に関して数十回のCommitを進んだが、解決することは出来なかった。

たが、それでも解決することわ出来なかった。

### 挑戦２
‘withCredentials: true’をheaderに追加し、Cookieをサーバー側に送ることにした。
だが、相変わらずCORSエラーが発生するようになった。


### 考察

