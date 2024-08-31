package com.usecases;

import com.target.TarefaRepository;
import com.target.usecases.DeletarTarefa;

public class DeletarTarefaImpl implements DeletarTarefa {
    private final TarefaRepository repository;

    public DeletarTarefaImpl(TarefaRepository repository) {
        this.repository = repository;
    }

    @Override
    public void execute(int id) {
        repository.deleteById(id);
    }
}
