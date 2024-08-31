package com.target;

import java.util.List;
import java.util.Optional;

public interface TarefaRepository {
    List<Tarefa> findAll();
    Optional<Tarefa> findById(int id);
    Tarefa save(Tarefa tarefa);
    void deleteById(int id);
}