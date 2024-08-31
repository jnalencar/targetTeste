package com.adapters.controllers;

import com.target.Tarefa;
import com.target.usecases.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/tarefa")
public class TarefaController {

    @Autowired
    private CriarTarefa criarTarefa;

    @Autowired
    private AtualizarTarefa atualizarTarefa;

    @Autowired
    private DeletarTarefa deletarTarefa;

    @Autowired
    private BuscarTarefa buscarTarefa;

    @GetMapping
    public List<Tarefa> getAllTarefas() {
        return buscarTarefa.execute();
    }

    @GetMapping("/{id}")
    public Optional<Tarefa> getTarefaById(@PathVariable int id) {
        return buscarTarefa.execute(id);
    }

    @PostMapping
    public Tarefa createTarefa(@RequestBody Tarefa tarefa) {
        return criarTarefa.execute(tarefa);
    }

    @PutMapping("/{id}")
    public Tarefa updateTarefa(@PathVariable int id, @RequestBody Tarefa tarefa) {
        return atualizarTarefa.execute(id, tarefa);
    }

    @DeleteMapping("/{id}")
    public void deleteTarefa(@PathVariable int id) {
        deletarTarefa.execute(id);
    }
}