package com.target.usecases;

import com.target.Tarefa;

import java.util.List;
import java.util.Optional;

public interface CriarTarefa {
    Tarefa execute(Tarefa tarefa);
}