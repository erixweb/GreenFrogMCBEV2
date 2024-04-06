class Scheduler {
    constructor() {
        this.ticks = 0
        this.tasks = []
        this.delayed_tasks = []
        this.repeating_tasks = []
    }

    run_on_next_tick(task) {
        this.tasks.push(task)
    }

    run_later(task, delay) {
        this.delayed_tasks.push({ task, delay })
    }

    repeat(task, delay = 1) {
        this.repeating_tasks.push({ task, delay })
    }
    
    #reset() {
        this.tasks = []
        this.delayed_tasks = this.repeating_tasks
    }

    tick() {
        this.tasks.forEach(task => task())
        
        this.delayed_tasks.forEach((item, index) => {
            if (item.delay <= 0) {
                item.task()

                this.delayed_tasks.splice(index, 1)
            } else {
                item.delay -= 1
            }
        })

        this.#reset()

        this.ticks++
    }
}

export { Scheduler }
