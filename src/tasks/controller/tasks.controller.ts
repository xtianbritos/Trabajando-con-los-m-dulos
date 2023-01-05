import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { TasksService } from '../service/tasks.service';
import { randomUUID, RandomUUIDOptions } from 'crypto';

export class Tarea {
  uuid: string;
  usuarioUuid: string;
  tarea: string;
}

let tareas: Tarea[]= [
  {
    uuid: randomUUID(),
    usuarioUuid: 'usuario0',
    tarea: 'correr'
  },
  {
    uuid: randomUUID(),
    usuarioUuid: 'usuario1',
    tarea: 'saltardormir'
  },{
    uuid: randomUUID(),
    usuarioUuid: 'usuario2',
    tarea: 'correr'
  }
  
]


@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('message')
  getHello(): string {
    return this.tasksService.getHello();
  }

  @Get('task')
  getTasks(): Tarea[] {
    return tareas;
  }

  @Get('task/:uuid')
  getTaskByUuid(@Param('uuid') id: string): Tarea {
    let index: number = tareas.findIndex(t => t.uuid == id);

    return tareas[index];
  }

  @Post('task')
  postTask(@Body() body:Tarea): Tarea {
    body.uuid = randomUUID();
    tareas.push(body);
    return body;
  }

  @Put('task/:uuid')
  putTask(@Param('uuid') id: string, @Body() body: Tarea): Tarea {
    let index: number = tareas.findIndex(t => t.uuid == id);
    
    tareas[index].usuarioUuid = body.usuarioUuid;
    tareas[index].tarea = body.tarea;

    return tareas[index];
  }

  @Patch('task/:uuid')
  patchTask(@Param('uuid') id: string, @Body() body: Tarea): Tarea {
    let index: number = tareas.findIndex(t => t.uuid == id);

    if(body.usuarioUuid != null) {
      tareas[index].usuarioUuid = body.usuarioUuid;
    }
    if(body.tarea != null) {
      tareas[index].tarea = body.tarea;
    }

    return tareas[index];
  }

  @Delete('task/:id')
  deleteTask(@Param('id') id: string): boolean {
    let index: number = tareas.findIndex(t => t.uuid == id);

    if(index != -1) {
      tareas.splice(index, 1);
      return true;
    }
    return false;
  }
}
