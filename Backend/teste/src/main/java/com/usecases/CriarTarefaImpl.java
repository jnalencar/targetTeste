package com.usecases;

import com.target.Tarefa;
import com.target.TarefaRepository;
import com.target.usecases.*;

public class CriarTarefaImpl implements CriarTarefa {
    private final TarefaRepository repository;

    public CriarTarefaImpl(TarefaRepository repository) {
        this.repository = repository;
    }

    @Override
    public Tarefa execute(Tarefa tarefa) {
        return repository.save(tarefa);
    }
}