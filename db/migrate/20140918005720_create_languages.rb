class CreateLanguages < ActiveRecord::Migration
  def change
    create_table :languages do |t|
      t.string :type
      t.integer :salary_min
      t.integer :salary_max
      t.integer :count

      t.timestamps
    end
  end
end
