package com.adapters.repositories;

import com.target.Tarefa;
import com.target.TarefaRepository;

import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class InMemoryTarefaRepository implements TarefaRepository {
    private final List<Tarefa> tarefas = new ArrayList<>();

    @Override
    public List<Tarefa> findAll() {
        return new ArrayList<>(tarefas);
    }

    @Override
    public Optional<Tarefa> findById(int id) {
        return tarefas.stream().filter(tarefa -> tarefa.getId() == id).findFirst();
    }

    @Override
    public Tarefa save(Tarefa tarefa) {
        tarefas.removeIf(t -> t.getId() == tarefa.getId());
        tarefas.add(tarefa);
        return tarefa;
    }

    @Override
    public void deleteById(int id) {
        tarefas.removeIf(tarefa -> tarefa.getId() == id);
    }
}