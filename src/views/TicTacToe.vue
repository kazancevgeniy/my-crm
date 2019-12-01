<template>
    <div>
      <div class="page-title">
        <h3>Крестики-нолики</h3>
      </div>
      <div class="row">
        <div class="col s6">
          <div class="row">
            <div
              v-for="cell in cells"
              :key="cell.title"
              class="col s4 cell"
              :class="[cell.title, {disabled: cell.choose || isGameOver}]"
              @click="chooseCell(cell)"
            >
              <span class="cell-value" v-if="cell.value === 1">X</span>
              <span class="cell-value" v-else-if="cell.value === 2">O</span>
            </div>
          </div>
        </div>
        <div class="col s6 result">
          <h5 v-if="isGameOver" class="result__title">
            Победил игрок номер {{turn}}
          </h5>
          <h5 class="result__title" v-else>
            Ходит {{turn}} игрок
          </h5>
          <div class="center-align">
            <a class="waves-effect waves-light btn" @click="resetData">Начать заново</a>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
/* eslint-disable max-len */

export default {
  name: 'TicTacToe',
  data: () => ({
    turn: 1,
    isGameOver: false,
    cells: [
      {
        title: 'cell-1',
        choose: false,
        value: null,
      },
      {
        title: 'cell-2',
        choose: false,
        value: null,
      },
      {
        title: 'cell-3',
        choose: false,
        value: null,
      },
      {
        title: 'cell-4',
        choose: false,
        value: null,
      },
      {
        title: 'cell-5',
        choose: false,
        value: null,
      },
      {
        title: 'cell-6',
        choose: false,
        value: null,
      },
      {
        title: 'cell-7',
        choose: false,
        value: null,
      },
      {
        title: 'cell-8',
        choose: false,
        value: null,
      },
      {
        title: 'cell-9',
        choose: false,
        value: null,
      },
    ],
  }),
  computed: {
    allCellsChoose() {
      return this.cells.every(({ choose }) => choose === true);
    },
    isThreeInLine() {
      if (((this.cells[0].value === this.turn) && (this.cells[1].value === this.turn) && (this.cells[2].value === this.turn))
        || ((this.cells[0].value === this.turn) && (this.cells[3].value === this.turn) && (this.cells[6].value === this.turn))
        || ((this.cells[0].value === this.turn) && (this.cells[4].value === this.turn) && (this.cells[8].value === this.turn))
        || ((this.cells[1].value === this.turn) && (this.cells[4].value === this.turn) && (this.cells[7].value === this.turn))
        || ((this.cells[2].value === this.turn) && (this.cells[5].value === this.turn) && (this.cells[8].value === this.turn))
        || ((this.cells[2].value === this.turn) && (this.cells[4].value === this.turn) && (this.cells[6].value === this.turn))
        || ((this.cells[3].value === this.turn) && (this.cells[4].value === this.turn) && (this.cells[5].value === this.turn))
        || ((this.cells[6].value === this.turn) && (this.cells[7].value === this.turn) && (this.cells[8].value === this.turn))) {
        return true;
      }
      return false;
    },
  },
  methods: {
    chooseCell(cell) {
      if (!cell.choose && !this.isGameOver) {
        // eslint-disable-next-line no-param-reassign
        cell.choose = true;
        // eslint-disable-next-line no-param-reassign
        cell.value = this.turn;
        // eslint-disable-next-line no-plusplus,no-unused-expressions
        if (this.isThreeInLine || this.allCellsChoose) {
          this.isGameOver = true;
        } else {
          // eslint-disable-next-line no-unused-expressions
          this.turn === 1 ? this.turn = 2 : this.turn = 1;
        }
      }
    },
    resetData() {
      this.isGameOver = false;
      this.turn = 1;
      // eslint-disable-next-line no-unused-vars
      this.cells.forEach((cell) => {
        // eslint-disable-next-line no-param-reassign
        cell.choose = false;
        // eslint-disable-next-line no-param-reassign
        cell.value = '';
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .cell {
    height: 10rem;
    border: 4px solid orange;
    padding: 10px;
    cursor: pointer;
    text-align: center;
    &:hover {
      border: 5px solid lightgreen;
    }
    &-1,&-2,&-4,&-5,&-7,&-8 {
      border-right: none;
    }
    &-1,&-2,&-3,&-4,&-5,&-6 {
      border-bottom: none;
    }
    &-value {
      line-height: 115px;
      font-size: 60px;
    }
  }
  .cell-1:hover ~ .cell-4 {
    border-top: none;
  }
  .cell-1:hover ~ .cell-2 {
    border-left: none;
  }
  .cell-2:hover ~ .cell-5 {
    border-top: none;
  }
  .cell-2:hover ~ .cell-3 {
    border-left: none;
  }
  .cell-3:hover ~ .cell-6 {
    border-top: none;
  }
  .cell-4:hover ~ .cell-5 {
    border-left: none;
  }
  .cell-4:hover ~ .cell-7 {
    border-top: none;
  }
  .cell-5:hover ~ .cell-6 {
    border-left: none;
  }
  .cell-5:hover ~ .cell-8 {
    border-top: none;
  }
  .cell-6:hover ~ .cell-9 {
    border-top: none;
  }
  .cell-7:hover ~ .cell-8 {
    border-left: none;
  }
  .cell-8:hover ~ .cell-9 {
    border-left: none;
  }
  .disabled {
    cursor: not-allowed;
  }
  .result {
    &__title {
      text-align: center;
      margin-bottom: 40px;
    }
  }
</style>
