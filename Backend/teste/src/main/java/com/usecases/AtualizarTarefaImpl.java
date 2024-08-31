package com.usecases;

import java.util.Optional;

import com.target.Tarefa;
import com.target.TarefaRepository;
import com.target.usecases.*;

public class AtualizarTarefaImpl implements AtualizarTarefa {
    private final TarefaRepository repository;

    public AtualizarTarefaImpl(TarefaRepository repository) {
        this.repository = repository;
    }

    @Override
    public Tarefa execute(int id, Tarefa tarefa) {
        Optional<Tarefa> existingTarefa = repository.findById(id);
        if (existingTarefa.isPresent()) {
            Tarefa updatedTarefa = existingTarefa.get();
            updatedTarefa.setTitulo(tarefa.getTitulo());
            updatedTarefa.setDescricao(tarefa.getDescricao());
            updatedTarefa.setStatus(tarefa.getStatus());
            return repository.save(updatedTarefa);
        }
        return null;
    }
}