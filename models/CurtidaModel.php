<?php

function inserirCurtida($con, $dados){
    $stmt = $con->prepare(
        "INSERT INTO CURTIDA (id_usuario, legenda, imagem_url, data_publicacao) VALUES (?, ?, ?, ?) "
        );
    $stmt -> execute([ $dados["id_usuario"], $dados["legenda"], $dados["imagem_url"], $dados["data_publicacao"],]);
    return $con ->lastInsertId();
}

//READ
function listarCurtida($con){
    $stmt = $con->query("SELECT * FROM curtidas");
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}
//UPDATE
function atualizarCurtida($con){
    $stmt = $con->prepare(
        "UPDATE curtidas SET senha = ? WHERE id_curtida = ?"
    );
    $stmt ->execute([$dados["senha"], $id]);
}
//DELETE
function removerCurtida($con, $id){
    $stmt = $con->prepare(
        "DELETE FROM curtidas WHERE id_curtida = ?"
    );
    $stmt->execute([$id]);
}