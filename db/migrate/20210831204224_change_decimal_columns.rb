class ChangeDecimalColumns < ActiveRecord::Migration[6.1]
  def change
    change_column :assets, :allocation, :float
    change_column :assets, :quantity, :float
    change_column :accounts, :amount, :float
  end
end
