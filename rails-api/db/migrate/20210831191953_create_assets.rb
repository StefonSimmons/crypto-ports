class CreateAssets < ActiveRecord::Migration[6.1]
  def change
    create_table :assets do |t|
      t.string :symbol
      t.integer :allocation
      t.integer :quantity
      t.string :allocation_currency
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
