class CreateListings < ActiveRecord::Migration
  def change
    create_table :listing do |t|
      t.string :listing

      t.timestamps
    end
  end
end
