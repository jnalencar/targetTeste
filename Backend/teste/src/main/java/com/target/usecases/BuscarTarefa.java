package com.target.usecases;

import java.util.List;
import java.util.Optional;

import com.target.Tarefa;


public interface BuscarTarefa {
    List<Tarefa> execute();
    Optional<Tarefa> execute(int id);
}