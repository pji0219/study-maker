import * as articleModel from '../model/article.js';

// 게시글 조회
export async function getArticles(req, res) {
  const username = req.query.username;

  const articles = await (username
    ? articleModel.getAllByUsername(username)
    : articleModel.getAll());

  res.status(200).json(articles);
}

// id로 해당 게시글 찾음(게시글 디테일 구현하는데 이용)
export async function getArticleDetail(req, res) {
  const id = req.param.id;
  const article = await articleModel.getById(id);

  res.status(200).json(article);
}

// 게시글 생성
export async function createArticle(req, res) {
  const { title, text } = req.body;
  const article = await articleModel.create(title, text, req.userId);

  res.status(201).json(article);
}

// 게시글 수정
export async function updateArticle(req, res) {
  const id = req.params.id;
  const text = req.body.text;

  // 게시글을 수정하기 전에 작성자와 요청자의 id가 일치 하는지 확인 하기 위한 로직들
  // 먼저 게시글 데이터에 있는 작성자 id를 가져 오기 위해서 해당 게시글이 있는지부터 확인
  const article = await articleModel.getById();
  if (!article) {
    return res.sendStatus(404);
  }

  // 게시글 작성자 id와 요청 id가 다르면 권한이 없으므로 403코드
  if (article.userId !== req.userId) {
    return res.sendStatus(403);
  }

  // 위 경우가 아닐시에 업데이트
  const updated = await articleModel.update(id, text);
  res.status(200).json(updated);
}

// 게시글 삭제
export async function removeArticle(req, res) {
  const id = req.params.id;
  const article = await articleModel.getById(id);

  if (!article) {
    return res.sendStatus(404);
  }

  if (article.userId !== req.userId) {
    return res.sendStatus(403);
  }

  await articleModel.remove(id);
  res.sendStatus(204);
}
