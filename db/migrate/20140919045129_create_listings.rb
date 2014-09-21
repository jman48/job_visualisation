class CreateListings < ActiveRecord::Migration
  def change
    create_table :listing do |t|
        t.text :listing

      t.timestamps
    end
  end
end
