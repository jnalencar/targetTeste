package com.target;

import java.util.Date;

public class Tarefa {
    private int id;
    private String titulo;
    private String descricao;
    private String status;
    private Date dataCriacao;

    // Getters e Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(Date dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    // toString
    @Override
    public String toString() {
        return "Tarefa [dataCriacao=" + dataCriacao + ", descricao=" + descricao + ", id=" + id + ", status=" + status
                + ", titulo=" + titulo + "]";
    }
    
}