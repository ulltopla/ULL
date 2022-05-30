import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne, OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Section} from "./section.entity";
import {Provider} from "../../auth/entity/provider.entity";

@Entity({name: 'performance'})
export class PerformanceEntity {
    @PrimaryGeneratedColumn('uuid', {name: 'id_performance'})
    idPerformance: string;

    @Column({name: 'performance_title'})
    performanceTitle: string;

    @Column({name: 'performance_description'})
    performanceDescription: string;

    @Column({name: 'performance_picture'})
    performancePicture: string;

    @Column({name: 'price_value'})
    priceValue: number;

    @Column({name: 'price_unit'})
    priceUnit: number;

    @ManyToOne(() => Section, section => section.performances, {nullable: true})
    @JoinColumn({name: 'id_section'})
    section: Section;

    @Column({name: 'y_index', nullable: true})
    yIndex: number;

    @ManyToOne(() => Provider, (provider) => provider.performances, {nullable: false})
    @JoinColumn({name: 'id_provider'})
    provider: Provider;

    @OneToOne(()=>PerformanceEntity, {nullable: true})
    @JoinColumn({name: 'id_performance_parent'})
    performanceParent?: PerformanceEntity;

    @Column()
    deleted: boolean;

    @Column({name: 'deleted_at', type: 'timestamp with time zone'})
    deletedAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;
}