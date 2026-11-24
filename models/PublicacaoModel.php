<?php

function inserirPublicacao($con, $dados){
    $stmt = $con->prepare(
        "INSERT INTO PUBLICACAO (id_usuario, legenda, imagem_url, data_publicacao) VALUES (?, ?, ?, ?) "
        );
    $stmt -> execute([ $dados["id_usuario"], $dados["legenda"], $dados["imagem_url"], $dados["data_publicacao"],]);
    return $con ->lastInsertId();
}

//READ
function listarPublicacao($con){
    $stmt = $con->query("SELECT * FROM publicacoes");
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}
//UPDATE
function atualizarPublicacao($con){
    $stmt = $con->prepare(
        "UPDATE publicacoes SET senha = ? WHERE id_publicacao = ?"
    );
    $stmt ->execute([$dados["senha"], $id]);
}
//DELETE
function removerPublicacao($con, $id){
    $stmt = $con->prepare(
        "DELETE FROM publicacoes WHERE id_publicacao = ?"
    );
    $stmt->execute([$id]);
}