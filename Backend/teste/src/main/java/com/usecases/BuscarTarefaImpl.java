package com.usecases;

import java.util.List;
import java.util.Optional;

import com.target.Tarefa;
import com.target.TarefaRepository;
import com.target.usecases.BuscarTarefa;

public class BuscarTarefaImpl implements BuscarTarefa {
    private final TarefaRepository repository;

    public BuscarTarefaImpl(TarefaRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<Tarefa> execute() {
        return repository.findAll();
    }

    @Override
    public Optional<Tarefa> execute(int id) {
        return repository.findById(id);
    }
}
