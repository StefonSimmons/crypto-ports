class ChangeColumn < ActiveRecord::Migration[6.1]
  def change
    change_column :assets, :allocation, :decimal, precision: 10, scale: 8
    change_column :assets, :quantity, :decimal, precision: 10, scale: 8
    change_column :accounts, :amount, :decimal, precision: 10, scale: 2
  end
end
