package com.target.usecases;

import com.target.Tarefa;

public interface AtualizarTarefa {
    Tarefa execute(int id, Tarefa tarefa);
}